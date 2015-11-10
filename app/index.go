package app

import (
	"github.com/codegangsta/martini"
	"github.com/martini-contrib/render"
)

var Instance *martini.ClassicMartini

func init() {
	Instance = martini.Classic()
	Instance.Use(render.Renderer(render.Options{
		Directory: "views", // Specify what path to load the templates from.
		// Layout:     "layout",                   // Specify a layout template. Layouts can call {{ yield }} to render the current template.
		Extensions: []string{".htm", ".html"}, // Specify extensions to load for templates.
		// Funcs:           []template.FuncMap{AppHelpers}, // Specify helper function maps for templates to access.
		// Delims:     render.Delims{"{[{", "}]}"}, // Sets delimiters to the specified strings.
		Charset: "UTF-8", // Sets encoding for json and html content-types. Default is "UTF-8".
		// IndentJSON: true,    // Output human readable JSON
		// IndentXML:  true,    // Output human readable XML
		// HTMLContentType: "application/xhtml+xml",     // Output XHTML content type instead of default "text/html"
	}))
}
