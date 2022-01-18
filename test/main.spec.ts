import {M3uParser} from "../src/m3u-parser";
import {complex, extGroupDirectiveOrder} from "./test-m3u";

describe('Parse and generate test', () => {
    it('should be same as original after parse and generate', () => {
        expect(M3uParser.parse(complex).getM3uString()).toEqual(complex);
    });

    it('should be parsed when random order of #EXTGRP directive is present', () => {
        const parsed = M3uParser.parse(extGroupDirectiveOrder);
        expect(parsed.medias[0].group).toEqual('Test TV group 1');
        expect(parsed.medias[1].group).toEqual('Test TV group 2');
    });
});
