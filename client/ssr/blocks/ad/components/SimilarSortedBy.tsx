import React, { Component } from 'react';


class SimilarSortedBy extends Component {
    render() {
        return (
            <div className="col-md-12 col-lg-6">
                <select name="similar" id="similar" className="form-control">
                    <option value="" selected hidden>Sort by</option>
                    <option value="">NEW</option>
                </select>
            </div>
        )
    }
}

export default SimilarSortedBy;