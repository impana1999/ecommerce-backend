import { Request, Response } from 'express';
import { RoleService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class RoleController {
  private roleService = new RoleService();

  public roleCreater = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const roleData = await this.roleService.createRole(req.body);
    ApiResponse.successResponseWithData(res, 'Role created Successfully', roleData);
  });

  public getbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const data = await this.roleService.getbyId(id);
    ApiResponse.successResponseWithData(res, 'Role get by id Successfully', data);
  });

  public deletebyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const data = await this.roleService.deleteById(id);
    ApiResponse.successResponse(res, 'Role delete by id Successfully');
  });

  public getallroles = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const roleData = await this.roleService.getAllRoles();
    ApiResponse.successResponseWithData(res, 'Get all roles Successfully', roleData);
  });

  public getAllrolesShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const roleData = await this.roleService.getAllRolesShort();
    ApiResponse.successResponseWithData(res, 'Get Id and Name Successfully', roleData);
  });

  public updatePermission = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const roleId = req.params.roleId;
    const data = await this.roleService.updateRolePermission(roleId, req.body);
    ApiResponse.successResponseWithData(res, 'Role data updated Successfully', data);
  });
}
