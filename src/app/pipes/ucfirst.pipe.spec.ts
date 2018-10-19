import {UcfirstPipe} from './ucfirst.pipe';

describe('UcfirstPipe', () => {
    it('create an instance', () => {
        const pipe = new UcfirstPipe();
        expect(pipe).toBeTruthy();
    });

    it('should transform successfully', () => {
        const pipe = new UcfirstPipe();
        expect(pipe.transform('welcome to the jungle!')).toEqual('Welcome to the jungle!');
    });
});
