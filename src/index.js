require('dotenv').config()
const { default: axios } = require('axios');
const { getGoalMap, writePolyanet, writeCometh, writeSoloon } = require('./api');
const { timer } = require('./utils');

const candidateId = process.env.CANDIDATE_ID;
const baseUrl = process.env.BASE_URL;

const main = async () => {
  const goalMap = await getGoalMap();

  //Phase 1 approach:
  // for(let row = 0; row < goalMap.length; row++) {
  //   for(let column = 0; column < goalMap[row].length; column++) {
  //     if (goalMap[row][column] === 'POLYANET') {
  //       await writePolyanet(row, column)
  //       await timer(1000);
  //     }
  //   }
  // }

  //Phase 2 approach:
  for(let row = 0; row < goalMap.length; row++) {
    for(let column = 0; column < goalMap[row].length; column++) {
      if (goalMap[row][column] !== 'SPACE') {
        try {
          await axios.post(`${baseUrl}${goalMap[row][column] === 'POLYANET' ? 'polyanets' : `${goalMap[row][column].split("_")[1].toLowerCase()}s`}`,
            {
              "row": row,
              "column": column,
              "candidateId": candidateId,
              ... (goalMap[row][column].split("_").length === 2 && goalMap[row][column].split("_")[1] === "SOLOON") && { color: goalMap[row][column].split("_")[0].toLowerCase() },
              ... (goalMap[row][column].split("_").length === 2 && goalMap[row][column].split("_")[1] === "COMETH") && { direction: goalMap[row][column].split("_")[0].toLowerCase() }
            }
          )
          await timer(1000);
        } catch (error) {
          console.log(error)
        }
      } 
    }
  }
}

main()