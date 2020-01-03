export class GenericRepo {
  public findOne;
  public update;
  public save;
  public insert;
  public remove;
  public createQueryBuilder;

  constructor() {
    this.findOne = jest.fn().mockReturnValue({});
    this.update = jest.fn().mockReturnValue({});
    this.save = jest.fn().mockReturnValue({});
    this.insert = jest.fn().mockReturnValue({});
    this.remove = jest.fn().mockReturnValue({});
    this.createQueryBuilder = jest.fn().mockReturnValue({
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnThis(),
    });
  }
}
