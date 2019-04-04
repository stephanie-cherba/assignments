import React, { Component } from 'react';
import { withContext } from './dataProvider.js';
import BluePostIt from './Images/bluePostIt.jpeg';
import YellowPostIt from './Images/yellowPostIt.jpeg';
import GreenPostIt from './Images/greenPostIt.jpg';
import PinkPostIt from './Images/pinkPostIt.jpeg';
import './Styles/DisplayNotes.css'


class DisplayNotes extends Component {
    constructor(){
        super();
        this.state = {
            edit: false,
            title: '',
            description: '',
            _id: '',
            postItColor: ''
        }
    }

    toggleEdit = () => {
        this.setState(prevState => ({edit: !prevState.edit}))
    }

    handleChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        let backgroundImg;
        console.log(this.state.postItColor)
        if(this.state.postItColor === 'blue'){
            backgroundImg = 'hhttps://i.pinimg.com/400x300/13/fb/e7/13fbe75311f5b7eb89b75dc43efa3c31.jpg'
        }else if(this.state.postItColor === 'green'){
            backgroundImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3XSNAqDitLJqPYY3S7AeMjN4L6iMhEaCeA0E5lbqnreuc_x17'
        }else if(this.state.postItColor ==='pink'){
            backgroundImg = 'https://i.pinimg.com/originals/e9/88/99/e98899b6eef240919eda4671f5b3e40e.png'
        }else if(this.state.postItColor === 'yellow'){
            backgroundImg = 'https://png.clipart.me/previews/a0a/free-vector-yellow-post-it-notes-with-push-pin-27013.png'
        }
        const editedNote = {
            _id: this.props.note._id,
            title: this.state.title,
            description: this.state.description,
            backgroundImg: backgroundImg
        }
        
        console.log(editedNote)
        this.props.editNote(editedNote).then(this.toggleEdit())
    }

    deleteNote = () => {
        if(window.confirm('Do you really wish to delete this note?')) this.props.deleteNote(this.props.note._id)
    }

    componentDidMount(){
        let { title, description } = this.props.note;
        this.setState({title, description})
    }

    render() {
        let { title, description, backgroundImg } = this.props.note;
        
        return (
            <div className='noteContainer' style={{backgroundImage: `url(${backgroundImg})`}}>
                {!this.state.edit ?
                    <>
                        <div className='noteTitle'>{title}</div>
                        <div className='noteDescription'>{description}</div>
                        <div className='noteButtons'>
                            <img onClick={this.toggleEdit} className='editNote' src="https://img.icons8.com/dotty/80/000000/edit.png" alt=''></img>
                            <img onClick={this.deleteNote} src="https://img.icons8.com/windows/32/000000/trash.png" alt=''></img>
                        </div>
                    </>
                :
                    <form className='editNoteForm' onSubmit={this.handleSubmit}>
                        <input type="text"
                            placeholder='title'
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange} />
                        <textarea type="text"
                            placeholder='description'
                            name='description'
                            value={this.state.description}
                            onChange={this.handleChange} />
                        <div>
                            <select name='postItColor' onChange={this.handleChange} required id="">
                                <option value=""></option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="pink">Pink</option>
                                <option value="yellow">Yellow</option>
                            </select>
                        </div>
                        <button className='saveNoteButton'><img className='saveNote' src="https://img.icons8.com/wired/64/000000/save-as.png" alt='' /></button>
                    </form> 
                }
            </div>
        );
    }
};


export default withContext(DisplayNotes);