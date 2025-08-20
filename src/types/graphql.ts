export enum IdTypeEnum {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  SLUG = 'SLUG',
  URI = 'URI',
}

export interface QueryVariables<TidType = IdTypeEnum> {
  id: string;
  idType: TidType;
}
