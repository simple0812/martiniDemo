package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"reflect"
)

type BodyParser struct {
}

func (BodyParser) ToMap(input io.ReadCloser) (map[string]interface{}, error) {
	result, err := ioutil.ReadAll(input)
	defer input.Close()
	if err != nil {
		return nil, err
	}

	var f interface{}
	json.Unmarshal(result, &f)

	if reflect.TypeOf(f).Kind() != reflect.Map {
		return nil, fmt.Errorf("body data is not object")
	}

	return f.(map[string]interface{}), nil
}

func (BodyParser) ToSlice(input io.ReadCloser) ([]interface{}, error) {
	result, err := ioutil.ReadAll(input)
	defer input.Close()
	if err != nil {
		return nil, err
	}

	var f interface{}
	json.Unmarshal(result, &f)

	if reflect.TypeOf(f).Kind() != reflect.Slice {
		return nil, fmt.Errorf("body data is not object")
	}

	return f.([]interface{}), nil
}

func (BodyParser) ToStruct(input io.ReadCloser, object interface{}) error {
	result, _ := ioutil.ReadAll(input)
	defer input.Close()

	json.Unmarshal(result, object)

	return nil
}
