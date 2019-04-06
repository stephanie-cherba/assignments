const express = require('express');
const User = require('../models/userModel')
const apiRoute = express.Router();


    apiRoute.put('/user/:id', async (req, res, next) => {
        try{
            let user = await User.findOneAndUpdate({_id: req.user._id}, req.body)
            if(user) res.status(200).send(user)
        }
        catch(err){
            return next(err)
        }
    })

    // adding a new note
    apiRoute.put('/user/:userId/notes', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            user.notes.push(req.body)
            console.log(req.body)
            user.save()
            return res.status(200).send(user)
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })

    // updating a note
    apiRoute.put('/user/:userId/notes/:noteId', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            const noteToChange = user.notes.id(req.params.noteId)
            noteToChange.set(req.body)
            console.log(noteToChange)
            user.save()
            if(noteToChange) {
                return res.status(200).send(user)
            }
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })

    // deleting a note
    apiRoute.delete('/user/:userId/notes/:noteId', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            user.notes.pull(req.params.noteId)
            user.save()
            return res.status(200).send(user)
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })


    // Collection Routes

       // adding a new collection
       apiRoute.put('/user/:userId/collections', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            user.collections.push(req.body)
            console.log(req.body)
            user.save()
            return res.status(200).send(user)
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })

    // updating a collection
    apiRoute.put('/user/:userId/collections/:collectionId', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            const collectionToChange = user.collections.id(req.params.collectionId)
            collectionToChange.set(req.body)
            console.log(collectionToChange)
            user.save()
            if(collectionToChange) {
                return res.status(200).send(user)
            }
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })

    // deleting a collection
    apiRoute.delete('/user/:userId/collections/:collectionId', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            user.collections.pull(req.params.collectionId)
            user.save()
            console.log(user)
            return res.status(200).send(user)
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })
    



        // Page Routes

       // adding a new page
       apiRoute.put('/user/:userId/collections/:collectionId/pages', async (req, res, next) => {
           console.log('fired')
           console.log(req.params.userId)
        try{
            const user = await User.findOne({_id: req.params.userId})
            const collectionToChange = user.collections.id(req.params.collectionId)
            console.log(req.params.collectionId)
            collectionToChange.pages.push(req.body)
            user.save()
            return res.status(200).send(user)
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })

    // updating a page
    apiRoute.put('/user/:userId/collections/:collectionId/pages/:pageId', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            const pageToChange = user.pages.id(req.params.pageId)
            pageToChange.set(req.body)
            console.log(pageToChange)
            user.save()
            if(pageToChange) {
                return res.status(200).send(user)
            }
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })

    // deleting a page
    apiRoute.delete('/user/:userId/collections/:collectionId/pages/:pageId', async (req, res, next) => {
        try{
            const user = await User.findOne({_id: req.params.userId})
            user.pages.pull(req.params.pageId)
            user.save()
            return res.status(200).send(user)
        }
        catch (err){
            console.log(err)
            return next(err)
        }
    })
    

    module.exports = (apiRoute)