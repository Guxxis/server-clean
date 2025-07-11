const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  server_ip: { type: String, required: true },
  server_user: { type: String, required: true },
  server_domain: { type: String, required: true },
  server_suspended: { type: Boolean, default: false },
  sense_status: { type: Boolean, default: false },
  sense_id: { type: String, default: null },
  sense_contract: { type: String, default: null },
  sense_ip: { type: String, default: null },
  sense_stage: { type: String, default: null },
  sense_name: { type: String, default: null },
  production_ip: { type: String, default: null },
  ssl_expiration: { type: Int16Array, default: null },
}, { timestamps: true });


module.exports = mongoose.model('Domain', domainSchema);
