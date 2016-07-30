package employee

import (
	"fmt"
	//"log"
	"net/http"
	"time"

	"appengine"
	"appengine/datastore"
	"appengine/log"
	//"appengine/user"
)

type Employee struct {
	Name     string
	Role     string
	HireDate time.Time
	//Account  string
}

func init() {
	http.HandleFunc("/", handle)
}

func handle(w http.ResponseWriter, r *http.Request) {

	//log.Println("START")
	ctx := appengine.NewContext(r)
	log.Debugf(ctx, "Datastore  start")

	e1 := Employee{
		Name:     "Joe Citizen",
		Role:     "Manager",
		HireDate: time.Now(),
		//Account:  user.Current(ctx).String(),
	}

	key, err := datastore.Put(ctx, datastore.NewIncompleteKey(ctx, "employee", nil), &e1)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var e2 Employee
	if err = datastore.Get(ctx, key, &e2); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Stored and retrieved the Employee named %q", e2.Name)
}
