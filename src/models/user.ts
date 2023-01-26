import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

interface userAttributesI {
	id?: number;
	name: string;
	email: string;
	password: string;
}

export interface userOutputI {
	dataValues: addUserOptionalFields;
}

export interface addUserOptionalFields
	extends Optional<userAttributesI, 'id'> {}

class User
	extends Model<userAttributesI, addUserOptionalFields>
	implements userAttributesI
{
	id!: number;
	name!: string;
	email!: string;
	password!: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'not an email',
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, tableName: 'users', timestamps: true }
);

export default User;
