import Keyword from 'keyword-extractor'
import wikijs from './wikiAPI/wiki'

const options = { apiUrl: 'https://en.wikipedia.org/w/api.php' }

const isValidConcept = async (q) => {
  const page = await wikijs(options)
    .page(q)
    .catch((err) => {
      return err
    })
  const isErr = page instanceof Error
  return isErr
}

const genTags = (text) => {
  const result = Keyword.extract(text, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  })
  const parse = result.filter((m) => {
    return m.match(/\w{6,}/)
  })
  parse.reverse()
  const arr = []
  for (let i = 0; i < 10; i++) {
    arr.push(parse.pop())
  }
  return arr
}

const test = () => {}

const search = (q) => wikijs(options).search(q)

const getConcept = async (q) => {
  const page = await wikijs(options)
    .page(q)
    .catch((err) => {
      return err
    })
  const isErr = page instanceof Error
  if (!isErr) {
    const name = page.title
    const content = await page.summary()
    const tags = genTags(content)
    const img = await page.mainImage()
    const alt = img ? img.split('/').pop() : name
    const concept = {
      name: name,
      content: content,
      alt: alt,
      img: img,
      tags: tags
    }
    return concept
  } else {
    return null
  }
}

const getClash = async (q1, q2) => {
  const one = await getConcept(q1)
  const two = await getConcept(q2)
  return {
    one: one,
    two: two
  }
}

export default {
  getConcept,
  isValidConcept,
  getClash,
  search,
  test
}
