package master

import (
	//"fmt"
	"html/template"
	"net/http"
	//"net/url"
	//"regexp"
	//"time"
	"appengine"
	"appengine/datastore"
	//"log"
	// "appengine/datastore"
	// "appengine/log"
)

type Book struct {
	Title    string
	Author   string
	Contents string
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	//body := r.FormValue("body")
	c := appengine.NewContext(r)

	q := datastore.NewQuery("book").Order("Title")

	var books []*Book
	keys, err := q.GetAll(c, &books)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// you'll see this a lot because instances
	// do not have this by default
	for i := 0; i < len(books); i++ {
		c.Debugf("The message: %v", books[i])
		c.Debugf("The keys: %v", keys[i])
	}

	//return categories, nil
	//
	// var books []*Book
	// books = append(books, &Book{Title: "JavaScript", Author: "kinoshita", Contents: "とても面白い"})
	// books = append(books, &Book{Title: "p5.js", Author: "由谷", Contents: "勉強する"})
	renderTemplate(w, "view", books)
}

func editHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	c.Debugf("The message: %v", r.URL.Query().Get("title"))
	title := r.URL.Query().Get("title")

	var books []*Book
	books = append(books, &Book{Title: title, Author: "kinoshita", Contents: "とても面白い"})
	renderTemplate(w, "edit", books)

	if r.FormValue("exec") == "store" {
		c.Debugf("The message: %v", "push Stored")
	}

}

func saveHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	c.Debugf("The message: %v", "saveHandler")
	var books []*Book

	if r.FormValue("exec") == "store" {
		c.Debugf("The message: %v", "post Stored")
		c.Debugf("The title: %v", r.FormValue("title"))
		c.Debugf("The author: %v", r.FormValue("author"))
		c.Debugf("The contents: %v", r.FormValue("contents"))

		book := Book{
			Title:    r.FormValue("title"),
			Author:   r.FormValue("author"),
			Contents: r.FormValue("contents"),
		}

		key, err := datastore.Put(c, datastore.NewIncompleteKey(c, "book", nil), &book)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		c.Debugf("The key: %v", key)
		renderTemplate(w, "view", books)

	} else {
		renderTemplate(w, "save", books)
	}

}

//--------------
// template
// ParseFiles once at program initialization, parsing all templates into a single *Template.
// Then we can use the ExecuteTemplate method to render a specific template

// The function template.Must is a convenience wrapper that panics when passed a non-nil error value,
// and otherwise returns the *Template unaltered. A panic is appropriate here;
// if the templates can't be loaded the only sensible thing to do is exit the program.

var templates = template.Must(template.ParseFiles("edit.html", "view.html", "save.html"))

func renderTemplate(w http.ResponseWriter, tmpl string, books []*Book) {
	err := templates.ExecuteTemplate(w, tmpl+".html", books)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// var validPath = regexp.MustCompile("^/(edit|save|view)/([a-zA-Z0-9]+)$")
//
// func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		m := validPath.FindStringSubmatch(r.URL.Path)
// 		if m == nil {
// 			http.NotFound(w, r)
// 			return
// 		}
// 		fn(w, r, m[2])
// 	}
// }

func init() {
	http.HandleFunc("/", viewHandler)
	http.HandleFunc("/view", viewHandler)
	http.HandleFunc("/edit", editHandler)
	http.HandleFunc("/save", saveHandler)

}
