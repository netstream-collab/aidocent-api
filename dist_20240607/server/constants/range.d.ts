declare const Range: {
    readonly Min: {
        readonly USER_ID: 5;
        readonly USER_PW: 5;
        readonly USER_NAME: 1;
        readonly USER_NAME_LAST: 0;
        readonly NICKNAME: 1;
        readonly ROOM_NAME: 1;
        readonly ROOM_DESC: 0;
    };
    readonly Max: {
        readonly AT_EXP: "1y";
        readonly USER_ID: 200;
        readonly USER_PW: 30;
        readonly USER_NAME: 20;
        readonly USER_NAME_LAST: 10;
        readonly NICKNAME: 30;
        readonly CABINET_COUNT: 1;
        readonly JOINABLE_ROOM_COUNT: 30;
        readonly ROOM_NAME: 20;
        readonly ROOM_DESC: 300;
        readonly ROOM_CAPACITY: 8;
        readonly MEMO_EXP_HOUR: 12;
        readonly CHLT_PAPER_COUNT: 10000000000000000;
        readonly CHLT_IMG_WIDTH: 600;
        readonly CHLT_IMG_HEIGHT: 600;
    };
    readonly File: {
        readonly CHLT_IMG: readonly ["jpg", "png", "jpeg", "gif", "heic", "heif", "bmp", "JPG", "JPEG", "PNG", "HEIC", "HEIF"];
    };
};
export default Range;
