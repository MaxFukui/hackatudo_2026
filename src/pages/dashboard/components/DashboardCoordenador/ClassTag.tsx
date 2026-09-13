import { CLASS_ACCENT, COORDINATOR_CLASSES } from './coordinatorData'

function styleFor(className: string) {
  const schoolClass = COORDINATOR_CLASSES.find((item) => item.name === className)
  return schoolClass ? CLASS_ACCENT[schoolClass.accent] : { bg: '#A6CBDE', text: '#1F3D4F', border: '#88AEC2' }
}

export function ClassTag({ name }: { name: string }) {
  const colors = styleFor(name)
  return (
    <span className="inline-flex h-6 items-center rounded-full border px-2 text-caption font-semibold" style={{ backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }}>
      {name}
    </span>
  )
}

export function ClassTags({ scope }: { scope: string }) {
  const classes = COORDINATOR_CLASSES.filter((schoolClass) => scope.includes(schoolClass.name))
  if (classes.length === 0) return <ClassTag name={scope} />

  return (
    <>
      {classes.map((schoolClass) => (
        <ClassTag key={schoolClass.id} name={schoolClass.name} />
      ))}
    </>
  )
}
