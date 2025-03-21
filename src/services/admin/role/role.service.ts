//import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@/exceptions/HttpException';
import { RoleModel } from '@models/index';

export default class RoleService {
  private roleModel = RoleModel;

  // Create new Role
  public async createRole(roleInput: { name: string; permissions: []; isActive: boolean }) {
    try {
      const { name, isActive, permissions } = roleInput;

      const newRole = await (
        await this.roleModel.create({
          name,
          isActive,
          permissions,
        })
      ).save();
      const response = {
        newRole,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async getbyId(id: string) {

    try {
      const getdata = await this.roleModel.find({ _id: id });
      if (getdata.length == 0) {
        throw new HttpException(400, 'This id not exist');
      }
      return getdata
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  public async deleteById(id: string) {

    try {
      const role = await this.roleModel.findOneAndDelete({ _id: id })
      if (!role) {
        throw new HttpException(400, 'ID not Exist');

      }
      await this.roleModel.findByIdAndRemove(id);
      // const response = {
      //   message: 'Role  data removed successfully from database',
      // };
      // return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Author : Srinivas
  // Fetching the all data of all roles
  public async getAllRoles() {
    try {
      const roles = await this.roleModel.find();
      return roles;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Author : Srinivas
  // Fetching only Id and name of all roles
  public async getAllRolesShort() {
    try {
      const roles = await this.roleModel.find({}, '_id name');

      if (!roles) {
        throw new HttpException(400, 'No role found');
      }

      return roles;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Update role Permissions
  public async updateRolePermission(roleId: string, updatedData: any) {
    try {
      const role = await this.roleModel.findById(roleId)
      // console.log(roleToUpdate)
      if (!role) {
        throw new HttpException(404, 'Role not found');
      } else {
        if (updatedData.name) {
          role.name = updatedData.name;
        }
        if (updatedData.isActive) {
          role.isActive = updatedData.isActive;
        }
        if (updatedData.permissions) {
          role.permissions = updatedData.permissions;
        }
        const updatedRole = await role.save();
        return updatedRole
      }

    }
    catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
}

