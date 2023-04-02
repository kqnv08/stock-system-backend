import * as fs from "fs"
import * as path from "path"
import * as handlebars from "handlebars"

export class ViewRenderHtmlPage {
  static render(view: string, data: { [key: string]: any }) {
    try {
      const urlTemplate = path.resolve(process.cwd(), "src/templates")
      const viewTemplate = path.resolve(urlTemplate, `./${view}.html`)

      handlebars.registerHelper('formatCurrency', function (value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      })

      if (!fs.existsSync(viewTemplate))
        throw new Error("Path Does not exists!")

      const source = fs.readFileSync(viewTemplate, 'utf8').toString()
      const template = handlebars.compile(source)
      const output = template(data)

      return output
    } catch (error) {
      console.log("ViewRenderHtmlPage.catch", error)
      throw error
    }
  }
  static renderHTMLString(html: string, data: { [key: string]: any }) {
    try {

      const template = handlebars.compile(html)
      const output = template(data)

      return output
    } catch (error) {
      console.log("renderHTMLString.catch", error)
      throw error
    }
  }
  static renderMail(view: string, data: { [key: string]: any }) {
    try {
      const urlTemplate = path.resolve(process.cwd(), "src/templates/email")

      const viewTemplate = path.resolve(urlTemplate, `./${view}.html`)

      if (!fs.existsSync(viewTemplate))
        throw new Error("Path Does not exists!")

      const source = fs.readFileSync(viewTemplate, 'utf8').toString()
      const template = handlebars.compile(source)
      const output = template(data)

      return output
    } catch (error) {
      console.log("ViewRenderHtmlPage.catch", error)
      throw error
    }
  }

}
