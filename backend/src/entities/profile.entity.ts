import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Profile {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  title!: string;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt?: Date;
}