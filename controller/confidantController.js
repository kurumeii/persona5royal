import path from 'path'
import fs from 'fs/promises'

async function readFile(linkPath) {
  const fileDir = path.join(process.cwd(), linkPath)
  const reading = await fs.readFile(fileDir, 'utf-8')
  const content = JSON.parse(reading)
  return content
}

const getConfidantList = async () => {
  const content = await readFile('/database/confidants.json')
  return content
}

const getConfidantInfo = async searchParams => {
  const content = await readFile('/database/confidants.json')
  const result = content.find(obj => {
    if (obj.arcana.toLowerCase() === searchParams.toLowerCase()) return obj
    if (obj.name.toLowerCase() === searchParams.toLowerCase()) return obj
    if (obj.familyName.toLowerCase() === searchParams.toLowerCase()) return obj
  })
  if (Object.keys(result).length === 0) return {}
  result['fullname'] = result.familyName + ' ' + result.name
  return result
}

const getConfidantAbilities = async id => {
  const content = await readFile('/database/arcanaAbilities.json')
  const result = content.find(obj => obj.id === id.toLowerCase())
  return result
}

const getConfidantReponses = async id => {
  const path = `/database/responses/${id.toLowerCase()}.json`
  const content = await readFile(path)
  return content
}

export { getConfidantList, getConfidantAbilities, getConfidantReponses, getConfidantInfo }
