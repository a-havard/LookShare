import React, { useState } from "react";
import {Rating} from '../Rating';
const CommentForm=props=>
{
    let ratings=[1,2,3,4,5,6,7,8,9,10];
let [formData, setFormData]=useState({
    name: '',
    rating: '',
    comment:''
});
function onAddClick() {
    console.log(this.state.comment);
    let temp=new Rating(
     this.state.name,
        this.state.rating,
        this.state.comment,
        Date().slice(4,15)

);


   props.post.onReviewAdded(temp);
    setFormData({
        name: '',
        rating: '',
        comment:''
    });
}


    return <>



            <form className="container">
                <div className="row"><h2 className="revFormHead">Add Review</h2></div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text"
                                   id="name"
                                   name="name"
                                   value={formData.name}
                                   onChange={event => setFormData({name: event.target.value})}
                                   className="form-control"/>

                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">

                        <label htmlFor="rating">Rating</label>
                            <br/>
                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={event => setFormData({rating: event.target.value})}>

                            {
                                ratings.map((x, i) => <option key={ i }>{ x }</option>)
                            }</select>
                        </div>
                    </div>
                    <div className="col-3">
                        <br/>
                        <Rating value={formData.rating}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                       name="comment"
                       value={formData.comment}
                       onChange={event => setFormData({comment: event.target.value})}
                       className="form-control"/>
                    </div>
                </div>
                <div className="row">
            <div className="form-group">
                <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={ () => onAddClick() }>Submit</button>
            </div>
                </div>

        </form>
    </>;
}
export default CommentForm;