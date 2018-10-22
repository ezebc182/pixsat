import {TestBed} from '@angular/core/testing';

import {PixabayService} from './pixabay.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import mockedData from '../../mocks/pixabay.mock';
import { PixabayResponse } from '../interfaces/pixabay-response.interface';

describe('PixabayService', () => {
    let service: PixabayService;
		let httpMock: HttpTestingController;
		let search: string;
		let pixabayKey: string;
		let otherParams: string;
		let videosMock: PixabayResponse;
		let photosMock: PixabayResponse;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [PixabayService]
        });
				service = TestBed.get(PixabayService);
				httpMock = TestBed.get(HttpTestingController);
		});

		beforeEach(() => {
			search = 'tokyo';
			pixabayKey = environment.pixabay.key;
			otherParams = 'per_page=15&safesearch=true';
			photosMock = mockedData.photos;
			videosMock = mockedData.videos;
		});

		afterEach(() => {
			httpMock.verify();
		});

    it('should be created', () => {
				expect(service).toBeTruthy();
				expect(service.getPhotos).toBeDefined();
				expect(service.getVideos).toBeDefined();
		});

		it('should get videos', () => {
				service.getVideos(search).subscribe((response) => {
					expect(typeof response).toBe('object');
					expect(req.request.method).toBe('GET');
					expect(response).toEqual(videosMock);
				});

			const req = httpMock
				.expectOne(`${environment.pixabay.endpoint}videos/?key=${pixabayKey}&q=${search}&${otherParams}`);

			req.flush(videosMock);
		});

	it('should get photos', () => {
		service.getPhotos(search).subscribe((response) => {
			expect(typeof response).toBe('object');
			expect(req.request.method).toBe('GET');
			expect(response).toEqual(photosMock);
		});

		const req = httpMock.expectOne(`${environment.pixabay.endpoint}?key=${pixabayKey}&q=${search}&${otherParams}&image_type=photo`);

		req.flush(photosMock);
	});
});
