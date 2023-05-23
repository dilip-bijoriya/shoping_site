import adminModel from "../models/admin.model"
import roleModel from "../models/role.model";
import { RolesKeyEnum } from "../types/roles.types";

const Objects: any = {};
for (let key in RolesKeyEnum) {
    Objects[key] = true
}

export const AdminMigration = async () => {
    try {
        const role = await roleModel.findOneAndUpdate({ _id: '6454f526fd6e579cc57bed47' }, {
            name: 'Super Role',
            description: 'xyz',
            roles: Objects
        }, {
            upsert: true,
            new: true
        });
        await adminModel.findOneAndUpdate({ _id: '6454f526fd6e579cc57bed4d' }, {
            name: 'Super Admin',
            email: 'superadmin@gmail.com',
            phone: '9658852222',
            password: 'Dilip@1234',
            deletable: false,
            editable: true,
            roles: role._id
        }, {
            upsert: true,
            new: true
        });
        console.error('AdminMigration Done!');
    } catch (_: any) {
        console.error('AdminMigration Crash', _);
    }
}