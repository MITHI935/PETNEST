const asyncHandler = require('../utils/asyncHandler');
const appointmentService = require('../services/appointmentService');

const createAppointment = asyncHandler(async (req, res) => {
  const newAppointment = await appointmentService.createAppointment(req.body);
  res.status(201).json(newAppointment);
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getAllAppointments();
  res.status(200).json(appointments);
});

const updateAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedAppointment = await appointmentService.updateAppointment(id, req.body);
  if (!updatedAppointment) {
    const error = new Error('Appointment not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(updatedAppointment);
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await appointmentService.deleteAppointment(id);
  res.status(204).send();
});

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
};
