declare const Codes: {
    readonly ProjectStatus: {
        readonly VALID: "PS_VALID";
        readonly DELETED: "PS_DEL";
    };
    readonly ChatHisStatus: {
        readonly VALID: "CHS_VALID";
        readonly ERROR: "CHS_ERR";
    };
    readonly ChatHisResType: {
        readonly TEXT: "CHRT_TEXT";
        readonly VOICE: "CHRT_VOICE";
    };
    readonly LLMModels: string[];
};
export default Codes;
