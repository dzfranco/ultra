import { Test } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Manufacturer } from './manufacturer.entity';
import { GenericRepo } from '../shared/mocks/repo.mock';

describe('CarsController', () => {
  let manufacturerService: ManufacturerService;
  let manufacturerRepo: GenericRepo;

  beforeEach(async () => {
    manufacturerRepo = new GenericRepo();
    const module = await Test.createTestingModule({
      providers: [
        ManufacturerService,
        {
          provide: getRepositoryToken(Manufacturer),
          useValue: manufacturerRepo,
        },
      ],
    }).compile();

    manufacturerService = module.get<ManufacturerService>(ManufacturerService);
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getManufacturerById', () => {
    it('should call the right query', async () => {
      const id = 'abc';
      await manufacturerService.getManufacturerById(id);
      expect(manufacturerRepo.findOne).toHaveBeenCalledWith(id);
    });
  });
});
