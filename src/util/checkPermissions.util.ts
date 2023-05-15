import roleModel from "../models/role.model";
import { RolesKeyEnum } from "./../types/roles.types";
export async function checkPermission(adminId: string, permissionKey: RolesKeyEnum): Promise<boolean> {
    try {
        const role = await roleModel.findOne({ _id: adminId }).select({ roles: 1 });
        return role?.roles[permissionKey] || false;
    } catch (err) {
        console.log(err)
        return false
    }
}
