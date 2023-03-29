import {all, get, insert} from "../database";

export const looseGetPassword = async (passedUsername: string) => {
    const row = await get(`
          SELECT p.password, u.id as userId FROM
                passwords p
                inner join users u on p.userId = u.id
                where u.email = $passedUsername OR u.userName = $passedUsername 
        `,
        {passedUsername: passedUsername}
    );
    return row;
}


export const createUserWithPassword = async (userName, email, password) => {
  try {
    all('BEGIN');
    const lastId = await insert(`
            INSERT into users (email, userName, authority) 
            Select 
                tu.email, 
                tu.userName, 
                (Case when a.email is not null then 'admin' else 'user' end) as authority
                from (select $email as email, $userName as userName) tu
                left join admins a on a.email = tu.email
            RETURNING id;
        `,
        {
          email,
          userName
        },
    );

    await insert(
      `Insert into passwords (userId, password) values ($userId, $password)`,
      {
        userId: lastId, 
        password
      },
    );
    await all('COMMIT')
  } catch (err) {
    await all('ROLLBACK')
    console.error(err);
  } 
};

export const getUserInfo = async (userId: string) => {
  return await get(`SELECT id as userId, userName, email, authority FROM users where id = $userId`, {userId});
}
