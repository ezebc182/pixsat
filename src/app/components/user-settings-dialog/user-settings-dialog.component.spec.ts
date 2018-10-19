import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserSettingsDialogComponent} from './user-settings-dialog.component';


describe('WelcomeComponent', () => {
    let component: UserSettingsDialogComponent;
    let fixture: ComponentFixture<UserSettingsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserSettingsDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
