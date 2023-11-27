

type RecordWithoutWhiteSpace<Key extends string, Value> = 
  Key extends ` ${infer Rest}`
    ? RecordWithoutWhiteSpace<Rest, Value>
  : Key extends `\t${infer Rest}`
    ? RecordWithoutWhiteSpace<Rest, Value>
  : Key extends `\n${infer Rest}`
    ? RecordWithoutWhiteSpace<Rest, Value>
  : Key extends `${infer First}\n`
    ? RecordWithoutWhiteSpace<First, Value>
  : Key extends `${infer First} `
    ? RecordWithoutWhiteSpace<First, Value>
  : Key extends `${infer First}\t`
    ? RecordWithoutWhiteSpace<First, Value>
  : Record<Key, Value>

export type FindParam<After extends string> =  
    After extends `${infer BeforeComma},${infer Rest}` ? 
      RecordWithoutWhiteSpace<BeforeComma, string | number> & SQLStatementProps<Rest>
    : After extends `${infer BeforeParen})${infer Rest}`? 
      RecordWithoutWhiteSpace<`${BeforeParen}`, string | number> & SQLStatementProps<Rest>
    : After extends `${infer BeforeSpace} ${infer Rest}`? 
      RecordWithoutWhiteSpace<`${BeforeSpace}`, string | number> & SQLStatementProps<Rest>
    : After extends `${infer BeforeSemiColon};${infer Rest}` ? 
      RecordWithoutWhiteSpace<`${BeforeSemiColon}`, string | number> & SQLStatementProps<Rest>
    : RecordWithoutWhiteSpace<`${After}`, string | number>


export type SQLStatementProps<S extends string> =
  S extends `${infer Before}$${infer After}`
    ? FindParam<After>
  : {};


export type ParseColumnName<C extends string> = C extends `${infer STUFF} as ${infer ColumnName}`? 
  Record<ColumnName, any>: (
  C extends `${infer TableName}.${infer ColumnName}` ? 
    Record<ColumnName, any> : 
    Record<C, any>
);

export type ParseColumns<C extends string> = C extends `${infer Column}, ${infer Rest}`
  ? ParseColumnName<Column> & ParseColumns<Rest>
  : ParseColumnName<C>;

export type SelectStatementResults<S extends string> =
  S extends `${infer Before}SELECT ${infer Columns} FROM${infer Rest}`
    ? ParseColumns<Columns>
    : never;
