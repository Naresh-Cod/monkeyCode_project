import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MicroLabel } from './MicroLabel'

export function Contact() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="px-4 py-24 md:px-8 md:py-36">
      <MicroLabel>INVITATION / 00</MicroLabel>
      <h2 className="mt-6 font-display text-[14vw] font-semibold leading-[0.8] tracking-[-0.04em] md:text-[9vw]">
        HAVE AN IDEA
        <br />
        WORTH BUILDING?
      </h2>

      {!open && (
        <button
          type="button"
          data-cursor="ENTER"
          onClick={() => setOpen(true)}
          className="mt-10 border-b border-void pb-1 font-mono text-[12px] tracking-[0.28em]"
        >
          START A CONVERSATION →
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.2, 0.7, 0.15, 1] }}
            className="mt-12 max-w-2xl overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            {sent ? (
              <p className="font-display text-4xl font-semibold">RECEIVED. WE'LL WRITE BACK.</p>
            ) : (
              <div className="space-y-8">
                <Field label="NAME" name="name" />
                <Field label="EMAIL" name="email" type="email" />
                <label className="block">
                  <MicroLabel>PROJECT TYPE</MicroLabel>
                  <select
                    name="type"
                    required
                    className="mt-2 w-full border-b border-void/30 py-3 font-display text-2xl"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      SELECT
                    </option>
                    <option>WEB</option>
                    <option>AI</option>
                    <option>BRANDING</option>
                    <option>3D</option>
                    <option>EXPERIMENTAL</option>
                    <option>AUTOMATION</option>
                  </select>
                </label>
                <label className="block">
                  <MicroLabel>MESSAGE</MicroLabel>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="mt-2 w-full border-b border-void/30 py-3 font-sans text-base leading-relaxed"
                  />
                </label>
                <button
                  type="submit"
                  data-cursor="ENTER"
                  className="border border-void px-6 py-3 font-mono text-[11px] tracking-[0.24em]"
                >
                  SUBMIT →
                </button>
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
}: {
  label: string
  name: string
  type?: string
}) {
  return (
    <label className="block">
      <MicroLabel>{label}</MicroLabel>
      <input
        type={type}
        name={name}
        required
        className="mt-2 w-full border-b border-void/30 py-3 font-display text-2xl"
      />
    </label>
  )
}
