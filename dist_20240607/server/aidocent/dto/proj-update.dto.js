"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjUpdateDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const proj_create_dto_1 = require("./proj-create.dto");
class ProjUpdateDTO extends (0, swagger_1.PartialType)(proj_create_dto_1.ProjCreateDTO) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ProjUpdateDTO = ProjUpdateDTO;
//# sourceMappingURL=proj-update.dto.js.map