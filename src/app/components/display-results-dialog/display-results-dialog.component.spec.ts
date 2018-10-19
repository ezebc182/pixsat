import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DisplayResultsDialogComponent} from './display-results-dialog.component';


describe('DisplayResultsComponent', () => {
    let component: DisplayResultsDialogComponent;
    let fixture: ComponentFixture<DisplayResultsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DisplayResultsDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayResultsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
