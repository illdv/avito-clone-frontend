import React, { Component } from 'react';

require('./Search.sass');

class Search extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="row align-items-center p-y-22">
                <div className="col-md-12">
                    <form action="#" className="search form-inline form-row">
                        <div className="form-group col-6 col-md-3">
                            <select name="categories" className="search__options form-control">
                                <option value="">Job</option>
                                <option value="">Cars</option>
                                <option value="">The property</option>
                                <option value="">Other</option>
                            </select>
                        </div>
                        <div className="form-group col-6 col-md-3">
                            <input type="text" className="search__options form-control" placeholder="Search" name="search"/>
                        </div>
                        <div className="form-group col-6 col-md-2">
                            <select name="country" className="search__options form-control">
                                <option value="">Germany</option>
                                <option value="">United Arab Emirates</option>
                                <option value="">Kuwait</option>
                                <option value="">Other</option>
                            </select>
                        </div>
                        <div className="form-group col-6 col-md-2">
                            <select name="city" className="search__options form-control">
                                <option value="">Berlin</option>
                                <option value="">Dubai</option>
                                <option value="">Moscow</option>
                            </select>
                        </div>
                        <div className="form-group col-12 col-md-2">
                            <button className="btn orange-btn-outline search__button" type="submit">
                                <i className="fas fa-search p-x-5"></i>Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Search;