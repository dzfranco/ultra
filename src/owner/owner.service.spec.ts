import { Test } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { GenericRepo } from '../shared/mocks/repo.mock';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';

describe('OwnerService', () => {
  let ownerService: OwnerService;
  let ownerRepo: GenericRepo;
  let deleteSpy;
  let whereSpy;

  beforeEach(async () => {
    ownerRepo = new GenericRepo();
    deleteSpy = jest
      .spyOn(ownerRepo.createQueryBuilder(), 'delete')
      .mockReturnThis();
    whereSpy = jest
      .spyOn(ownerRepo.createQueryBuilder(), 'where')
      .mockReturnThis();

    jest.restoreAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        OwnerService,
        {
          provide: getRepositoryToken(Owner),
          useValue: ownerRepo,
        },
      ],
    }).compile();

    ownerService = module.get<OwnerService>(OwnerService);
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('removeOldOwners', () => {
    it('should call the right query', async () => {
      await ownerService.removeOldOwners();
      expect(ownerRepo.createQueryBuilder).toHaveBeenCalled();
      expect(whereSpy).toBeCalledWith('purchaseDate < :purchaseDate', {
        purchaseDate: expect.any(Date),
      });
      expect(deleteSpy).toHaveBeenCalled();
      expect(ownerRepo);
    });
  });
});
