import React from 'react';

export const Post= (props)=> {
   
    return (
        <div className='post__item--small'>
                <img className='post__item--small__image' src={props.image} alt=''/>
            <div className='post__item--small__content'>
                <p className='post__item--small__title'>{props.titlef}</p>
                <p className='post__item--small__created'>{ props.created } phút trước - <a href='#comments'> <ion-icon name="chatbubbles-outline"></ion-icon> {props.qtyComments}</a> </p>
            </div>
        </div>
    );
}

export const PostNewest= (props)=> {
   
    return (
        <div className='post__item--big'>
                <img className='post__item--big__image' src={props.image} alt=''/>
            <div className='post__item--big__content'>
                <p className='post__item--big__title'>{props.titlef}</p>
                <p className='post__item--big__created'>{ props.created } phút trước - <a href='#comments'> <ion-icon name="chatbubbles-outline"></ion-icon> {props.qtyComments}</a> </p>
            </div>
        </div>
    );
}
