const axios = require('axios');

const candidateId = process.env.CANDIDATE_ID;
const baseUrl = process.env.BASE_URL;


const getGoalMap = async () => {
  const response = await axios.get(`${baseUrl}map/${candidateId}/goal`)
  return response.data.goal;
}

const writePolyanet = async (row, column) => {
  try {
    const response = await axios.post(`${baseUrl}polyanets`, {
      "row": row,
      "column": column,
      "candidateId": candidateId
    })
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

const writeCometh = async (row, column, direction) => {
  const response = await axios.post(`${baseUrl}comeths`, {
    "row": row,
    "column": column,
    "direction": direction,
    "candidateId": candidateId
  })
  return response.data;
}

const writeSoloon = async (row, column, color) => {
  const response = await axios.post(`${baseUrl}soloons`, {
    "row": row,
    "column": column,
    "color": color,
    "candidateId": candidateId
  })
  return response.data;
}

module.exports = {
  getGoalMap,
  writePolyanet,
  writeCometh,
  writeSoloon
};