import path from 'path'
import fs from 'fs/promises'

export default async function handler(req, res) {
  try {
    const type = JSON.parse(req.body).type
    const result = await readFile(type)
    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}

async function readFile(type) {
  const fileDir = path.join(process.cwd(), `/database/quiz_n_exam/${type.toLowerCase()}.json`)
  const reading = await fs.readFile(fileDir, 'utf-8')
  const content = JSON.parse(reading)
  return content
}
