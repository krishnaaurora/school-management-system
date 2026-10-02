import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Printer, UserPlus, ShieldCheck, Key, Eye, EyeOff } from 'lucide-react';

export default function CredentialSuccessModal({
  isOpen,
  onClose,
  data,
  onRegisterAnother,
  isReset = false,
}) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  if (!isOpen || !data) return null;

  const isTeacher = data.role?.toUpperCase() === 'TEACHER';
  const roleName = isTeacher ? 'Teacher' : 'Student';
  const idLabel = isTeacher ? 'Employee ID' : 'Student ID / Admission No';
  const idValue = data.employeeId || data.studentId || 'N/A';
  const nameValue = data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim();
  const usernameValue = data.username || data.email || 'N/A';
  const tempPassword = data.temporaryPassword || data.password || '******';

  const credentialText = `==============================
GREENFIELD INTERNATIONAL SCHOOL
${isReset ? 'PASSWORD RESET NOTIFICATION' : 'NEW ACCOUNT CREDENTIALS'}
==============================
Role: ${roleName}
Full Name: ${nameValue}
${idLabel}: ${idValue}
Username / Email: ${usernameValue}
Temporary Password: ${tempPassword}
Portal URL: http://localhost:5173/#login
==============================
NOTE: For security, please change your password upon first login.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(credentialText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>GIS Credentials - ${nameValue}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1C2826; }
            .header { border-bottom: 2px solid #0B2E23; padding-bottom: 16px; margin-bottom: 24px; }
            h1 { color: #0B2E23; margin: 0; font-size: 24px; }
            .badge { display: inline-block; background: #E6F4EA; color: #137333; padding: 4px 12px; border-radius: 12px; font-weight: bold; font-size: 12px; margin-top: 8px; }
            .card { border: 1px solid #E0E0E0; border-radius: 8px; padding: 24px; background: #FAFAFA; max-width: 500px; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #EEE; font-size: 14px; }
            .row:last-child { border-bottom: none; }
            .label { color: #666; }
            .val { font-weight: bold; color: #000; }
            .password { font-family: monospace; font-size: 16px; color: #B31B1B; background: #FFF3F3; padding: 2px 8px; border-radius: 4px; }
            .footer { margin-top: 30px; font-size: 12px; color: #777; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Greenfield International School</h1>
            <p style="margin: 4px 0 0; color: #8C6218; font-weight: 600;">Office of Administrative Affairs &bull; Credentials Slip</p>
            <div class="badge">${roleName.toUpperCase()} ACCOUNT</div>
          </div>
          <div class="card">
            <div class="row"><span class="label">Full Name:</span><span class="val">${nameValue}</span></div>
            <div class="row"><span class="label">${idLabel}:</span><span class="val">${idValue}</span></div>
            <div class="row"><span class="label">Username / Email:</span><span class="val">${usernameValue}</span></div>
            <div class="row"><span class="label">Temporary Password:</span><span class="password">${tempPassword}</span></div>
            <div class="row"><span class="label">Assigned Role:</span><span class="val">${roleName}</span></div>
            <div class="row"><span class="label">Account Status:</span><span class="val" style="color: #137333;">ACTIVE</span></div>
          </div>
          <div class="footer">
            <p><strong>Instructions for User:</strong> Visit the GIS School Management Portal (<code>/#login</code>) and sign in using the credentials above. You will be prompted to reset your password on first login.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl border border-gold-400/30 shadow-2xl max-w-lg w-full overflow-hidden"
        >
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-[#0B2E23] to-[#144A3A] p-6 text-white text-center relative">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400/60 flex items-center justify-center mb-3 text-emerald-300 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="font-serif font-bold text-xl text-gold-300">
              {isReset ? 'Password Reset Successfully' : `${roleName} Registered Successfully`}
            </h2>
            <p className="text-xs text-emerald-100/80 mt-1">
              {isReset 
                ? `A new secure credential set has been provisioned for this ${roleName.toLowerCase()}.`
                : `The ${roleName.toLowerCase()} profile and login credentials have been saved successfully.`}
            </p>
          </div>

          {/* Credentials Display Card */}
          <div className="p-6 space-y-4">
            <div className="bg-[#FAF8F3] border border-[#C5A880]/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-xs text-gray-500 font-medium">Full Name</span>
                <span className="text-xs font-bold text-gray-900">{nameValue}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-xs text-gray-500 font-medium">{idLabel}</span>
                <span className="text-xs font-mono font-bold text-forest-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                  {idValue}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-xs text-gray-500 font-medium">Username / Login Email</span>
                <span className="text-xs font-semibold text-gray-900 select-all">{usernameValue}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-xs text-gray-500 font-medium">Assigned Role</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {roleName}
                </span>
              </div>

              {/* Password Highlight Field */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-600" />
                    Temporary Password
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <div className="bg-white border-2 border-amber-300/80 rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-gray-900 tracking-wider select-all">
                    {showPassword ? tempPassword : '••••••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-forest-900 transition-colors cursor-pointer"
                    title="Copy Password"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Security Caution Notice */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-[11px] text-amber-900 flex items-start gap-2.5">
              <span className="font-bold shrink-0">⚠️ IMPORTANT:</span>
              <span className="leading-relaxed">
                For security reasons, this temporary password is only displayed once and is not stored in plaintext. Provide these credentials to the user immediately.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-gold-400" /> : <Copy className="w-4 h-4 text-gold-400" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Credentials'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-gray-600" />
                <span>Print Credentials</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              {onRegisterAnother ? (
                <button
                  type="button"
                  onClick={onRegisterAnother}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-900 hover:underline cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register Another {roleName}</span>
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
