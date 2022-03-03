const { result } = require("../../utils/assertionAux");
const compareDBData = require("../../utils/compareDBData");
const includesObjArr = require("../../utils/compareDBData/includesObjArr");
const { defaultDB } = require("../../constants").database;

async function toReturnDataWith(
  database,
  {
    query,
    values = [],
    types = false,
    compare = false,
    includes = false,
    nonTest = false,
  }
) {
  try {
    console.log(query, 'test query');
    await database.query(`USE \`${defaultDB}\``);
    const data = await database.query(query, values);
    // console.log('test data', data);
    console.log(JSON.stringify(typeof compare === "object" && compareDBData(data, compare, types), 0, 2), 'Morreteste');
    if (nonTest) return data[0];

    const diff =
      (typeof compare === "object" && compareDBData(data, compare, types)) ||
      (typeof includes === "object" && includesObjArr(data, includes));

    const pass = diff === true;

    if (pass) {
      return result(null, true);
    }
    return result(
      null,
      false,
      `Diferenças com o resultado da query '${query}'\n\n` +
        JSON.stringify(diff, 0, 2)
    );
  } catch (e) {
    console.error(e);
    return result(
      null,
      false,
      `Não foi possível fazer uma consulta no banco de dados:\n"${e.message}"`
    );
  }
}

module.exports = toReturnDataWith;
