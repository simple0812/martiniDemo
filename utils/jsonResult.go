package utils

import (
	// "github.com/bitly/go-simplejson"
	"encoding/json"
)

type JsonResult struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Result  interface{} `json:"result"`
}

func NewJsonResult(status string, message string, result interface{}) *JsonResult {
	return &JsonResult{status, message, result}
}

func (jr *JsonResult) Stringify() (ret string, err error) {
	p, err := json.Marshal(jr)
	ret = string(p)
	return
}

func GetSucessResult(obj interface{}) (ret string, err error) {
	p, err := NewJsonResult("success", "", obj).Stringify()
	ret = string(p)
	return
}

func GetFailResult(reason string) string {
	return "{ \"status\":\"error\", \"message\": " + reason + ", \"result\":\"\" }"
}
