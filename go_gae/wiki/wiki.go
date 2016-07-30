package wiki

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"regexp"

	"appengine"
	"appengine/datastore"
)

type Page struct {
	Title string
	Body  []byte
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

//
// func (p *Page) save() error {
// 	c := appengine.NewContext(r)
// 	key := datastore.NewIncompleteKey(c, "Page", nil)
// 	if _, err := datastore.Put(c, key, Page); err != nil {
// 		// Handle err
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

func loadPage(title string) (*Page, error) {
	filename := title + ".txt"
	body, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return &Page{Title: title, Body: body}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
	p, err := loadPage(title)
	if err != nil {
		http.Redirect(w, r, "/edit/"+title, http.StatusFound)
		return
	}
	renderTemplate(w, "view", p)
}

func editHandler(w http.ResponseWriter, r *http.Request, title string) {
	p, err := loadPage(title)
	if err != nil {
		p = &Page{Title: title}
	}
	renderTemplate(w, "edit", p)

}

func saveHandler(w http.ResponseWriter, r *http.Request) {
	body := r.FormValue("body")
	p := &Page{Title: "test", Body: []byte(body)}

	c := appengine.NewContext(r)
	key := datastore.NewIncompleteKey(c, "Page", nil)
	if _, err := datastore.Put(c, key, p); err != nil {
		// Handle err
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//err := p.save()
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	http.Redirect(w, r, "/view/", http.StatusFound)
}

var templates = template.Must(template.ParseFiles("edit.html", "view.html"))

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
	err := templates.ExecuteTemplate(w, tmpl+".html", p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

var validPath = regexp.MustCompile("^/(edit|save|view)/([a-zA-Z0-9]+)$")

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := validPath.FindStringSubmatch(r.URL.Path)
		if m == nil {
			http.NotFound(w, r)
			return
		}
		fn(w, r, m[2])
	}
}

func init() {
	http.HandleFunc("/view/", makeHandler(viewHandler))
	http.HandleFunc("/edit/", makeHandler(editHandler))
	http.HandleFunc("/save/", makeHandler(saveHandler))
}
