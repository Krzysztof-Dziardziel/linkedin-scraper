export const scrapSelectorFields = (selector:any, section:any) => async (scrapedObjectPromise:any, fieldKey:any) => {
  const scrapedObject = await scrapedObjectPromise
  const field = section.fields[fieldKey]

  // currently field can be a selector string, or an object containing a selector field
  const fieldSelectorString = await field.selector
    ? field.selector
    : field

  const isFieldPresent = await selector.$(fieldSelectorString)

  if (!isFieldPresent) { return scrapedObject }

  if (field.isMultipleFields) {
    if (field.attribute === 'href') {
      scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems:any) => elems.map((elem:any) => elem.href ? elem.href.trim() : elem.innerHTML.trim()))
    } else if(field.attribute === 'src'){
      scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems:any) => elems.map((elem:any) => elem.src ? elem.src.trim() : elem.innerHTML.trim()))
    }else{
      scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems:any) => elems.map((elem:any) => elem.innerText.trim()))
    }
  } else if (field.hasChildrenFields) {
    const fieldChildrenSelectors = await selector.$$(field.selector)

    scrapedObject[fieldKey] = await Promise.all(
      fieldChildrenSelectors.map((s:any) => scrapSelector(s, field))
    )
  } else if (field.attribute && field.attribute === 'href') {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem:any) => elem && elem.href ? elem.href.trim() : '')
  } else if (field.attribute && field.attribute === 'src') {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem:any) => elem && elem.src ? elem.src.trim() : '')
  } else {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem:any) => elem && elem.innerText ? elem.innerText.trim() : '')
  }

  return scrapedObject
}
const scrapSelector = (selector:any, section:any) =>
  Object.keys(section.fields)
    .reduce(scrapSelectorFields(selector, section), Promise.resolve({}))

export const scrapSection = async (page:any, section:any) => {
  const sectionSelectors = await page.$$(section.selector)

  const scrapedPromises = sectionSelectors
    .map((selector:any) => scrapSelector(selector, section))

  return Promise.all(scrapedPromises)
}
