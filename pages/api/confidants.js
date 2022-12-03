import path from 'path'
import fs from 'fs/promises'

export default async function handler(req, res) {
  try {
    const { searchQuery } = JSON.parse(req.body)
    const fileDir = path.join(process.cwd(), `/database/confidants.json`)
    const readResult = await fs.readFile(fileDir, 'utf-8')
    const jsonList = JSON.parse(readResult)
    const result = jsonList.filter(obj => {
      const checkArcana = obj.arcana.toLowerCase().includes(searchQuery.toLowerCase()),
        checkName = obj.name.toLowerCase().includes(searchQuery.toLowerCase()),
        checkFamilyName = obj.familyName.toLowerCase().includes(searchQuery.toLowerCase()),
        checkId = obj.id.toLowerCase().includes(searchQuery.toLowerCase())
      const validArr = [checkArcana, checkName, checkFamilyName, checkId]
      if (validArr.some(valid => valid)) return obj
    })
    res.status(200).json({ result })
  } catch (error) {
    res.status(500).json({ error })
  }
}
