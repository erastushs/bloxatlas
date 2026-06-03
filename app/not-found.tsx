import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container as="main" className="py-12">
      <h1 className="type-page-title">404</h1>
      <p className="mt-3 text-content-muted">Page not found</p>
    </Container>
  )
}
