const Workout = require('../database/models/Workout')
const mongoose = require('mongoose')

const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    if (!workouts) return res.status(500).json('HMM!')
    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such workout' })

    const workout = await Workout.findById(id)

    if (!workout) return res.status(400).json({ error: 'Not Found' })

    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length > 0)
        return res
            .status(400)
            .json({ error: 'Please fill in all the fields', emptyFields })

    try {
        const workout = await Workout.create({ title, load, reps })
        return res.status(200).json(workout)
    } catch (error) {
        console.log(error)
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such workout' })

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) return res.status(400).json({ error: 'Not Found' })

    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such workout' })

    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    )

    if (!workout) return res.status(400).json({ error: 'Not Found' })
    res.status(200).json(workout)
}

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}
