"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Range = {
    Min: {
        USER_ID: 5,
        USER_PW: 5,
        USER_NAME: 1,
        USER_NAME_LAST: 0,
        NICKNAME: 1,
        ROOM_NAME: 1,
        ROOM_DESC: 0,
    },
    Max: {
        AT_EXP: '1y',
        USER_ID: 200,
        USER_PW: 30,
        USER_NAME: 20,
        USER_NAME_LAST: 10,
        NICKNAME: 30,
        CABINET_COUNT: 1,
        JOINABLE_ROOM_COUNT: 30,
        ROOM_NAME: 20,
        ROOM_DESC: 300,
        ROOM_CAPACITY: 8,
        MEMO_EXP_HOUR: 12,
        CHLT_PAPER_COUNT: 10000000000000000,
        CHLT_IMG_WIDTH: 600,
        CHLT_IMG_HEIGHT: 600,
    },
    File: {
        CHLT_IMG: [
            'jpg',
            'png',
            'jpeg',
            'gif',
            'heic',
            'heif',
            'bmp',
            'JPG',
            'JPEG',
            'PNG',
            'HEIC',
            'HEIF',
        ],
    },
};
exports.default = Range;
//# sourceMappingURL=range.js.map