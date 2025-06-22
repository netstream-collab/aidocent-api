"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonLogger_1 = require("./CommonLogger");
const text_util_1 = require("../../utils/common/text.util");
class TypeormLogger {
    logQuery(query, parameters, queryRunner) {
        CommonLogger_1.default.name('SQL').sql(query);
        if (!(0, text_util_1.isEmpty)(parameters)) {
            CommonLogger_1.default.name('SQL').sql(`parameters[${parameters.toString()}]`);
        }
        return;
    }
    logQueryError(error, query, parameters, queryRunner) {
        return;
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        return;
    }
    logSchemaBuild(message, queryRunner) {
        CommonLogger_1.default.name('SQL').info(message);
        return;
    }
    logMigration(message, queryRunner) {
        return;
    }
    log(level, message, queryRunner) {
        CommonLogger_1.default.name('SQL').write(level, message);
    }
}
exports.default = TypeormLogger;
//# sourceMappingURL=typeormLogger.js.map