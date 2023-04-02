import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { FindConditions, getConnection, QueryRunner, Repository, UpdateResult } from "typeorm"
import { paginate } from "nestjs-typeorm-paginate"

import { FilterCriteriaInfo, ListPageInfoResponse } from "../tables/criteria.table"

import { BaseModel } from "../classes/base-model.class"
import { queryBuilderCriteria } from ".."

@Injectable()
export abstract class BaseService<T extends BaseModel> {

  _modelClass: typeof BaseModel

  get modelClass() {
    return this._modelClass
  }

  set modelClass(model) {
    this._modelClass = model
  }

  constructor(private readonly engineRepo: Repository<T>) { }

  queryBuilder(alias?: string) {
    return this.engineRepo.createQueryBuilder(alias)
  }

  async listPage(criteria: FilterCriteriaInfo): Promise<ListPageInfoResponse> {
    const queryBuilder = this.engineRepo.createQueryBuilder("c")


    const resultQuery = queryBuilderCriteria<T>(queryBuilder, criteria)

    const resPaginate = await paginate(resultQuery, { page: criteria.page, limit: criteria.limit })

    return <ListPageInfoResponse>{
      page: criteria.page,
      limit: criteria.limit,
      totalRecords: resPaginate.meta.totalItems,
      totalPages: resPaginate.meta.totalPages,
      data: resPaginate.items as T[]
    }
  }

  async findAll(criteria?: FilterCriteriaInfo): Promise<Array<T>> {
    const queryBuilder = this.engineRepo
      .createQueryBuilder('c')
    if ((criteria?.filter) || (criteria?.sort)) {
      const resultQuery = queryBuilderCriteria<T>(queryBuilder, criteria)
      return await resultQuery.getMany()
    }

    return queryBuilder.getMany()
  }

  async findOne(id?: number | string, whereParameters?: FindConditions<T>): Promise<T> | never {

    let result: T
    if (id) {
      result = await this.engineRepo.findOne(String(id))
      if (!result) throw new NotFoundException("Not Record Found.")
    } else {
      try {
        result = await this.engineRepo.findOne({ where: whereParameters })
        if (!result) throw new NotFoundException("Not Record Found.")
      } catch (e) {
        console.log(e)
      }
    }
    return result
  }

  async create(attrs: any, connect: QueryRunner = null): Promise<T> {

    const queryRunner = connect != null ? connect : getConnection().createQueryRunner()

    try {

      if (connect == null) {
        await queryRunner.startTransaction()
      }

      const payload: T = Object.assign(new this._modelClass(), attrs)

      const result = await queryRunner.manager.save(payload)

      if (connect == null) {
        await queryRunner.commitTransaction()
      }

      return result
    } catch (error) {
      console.log(error)

      await queryRunner.rollbackTransaction()
      throw error
    } finally {

      if (connect == null) {
        await queryRunner.release()
      }
    }
  }

  async update(id: number | string, attrs: any, connect: QueryRunner = null): Promise<T | T[]> {

    const queryRunner = connect != null ? connect : getConnection().createQueryRunner()

    try {

      if (connect == null) {
        await queryRunner.startTransaction()
      }

      const entity = await this.findOne(id)

      if (!entity) throw new InternalServerErrorException("Not Record Found.")

      const payload = Object.assign(new this.modelClass(), entity, attrs)

      const result = await queryRunner.manager.save(payload)

      if (connect == null) {
        await queryRunner.commitTransaction()
      }

      return result
    } catch (error) {
      console.log(error)

      if (connect == null) {
        await queryRunner.rollbackTransaction()
      }

    } finally {

      if (connect == null) {
        await queryRunner.release()
      }
    }
  }

  async remove(id: number | string, connect: QueryRunner = null): Promise<any> {

    const queryRunner = connect != null ? connect : getConnection().createQueryRunner()

    try {

      if (connect == null) {
        await queryRunner.startTransaction()
      }

      const entity = await this.findOne(id)

      const payload = Object.assign(new this.modelClass(), entity)

      await queryRunner.manager.softRemove(payload)

      if (connect == null) {
        await queryRunner.commitTransaction()
      }

      return payload
    } catch (error) {
      console.log("remove.catch", error, connect)

      if (connect == null) {
        await queryRunner.rollbackTransaction()
      }
    } finally {

      if (connect == null) {
        await queryRunner.release()
      }
    }
  }

  async restore(id: number): Promise<UpdateResult> {
    try {
      const isRestored = await this.engineRepo.restore(String(id))

      return isRestored
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
