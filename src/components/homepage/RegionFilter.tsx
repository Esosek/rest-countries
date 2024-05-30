type RegionFilterProps = {};

export default function RegionFilter(props: RegionFilterProps) {
  function changeParam() {
    const url = new URL(window.location.href);
    url.searchParams.set('filter', 'enabled');
    window.history.pushState(null, '', url.toString());
  }

  function removeParam() {
    window.history.back();
  }
  return (
    <>
      {/* <div>
        <button onClick={changeParam}>Add query param</button>
        <button
          onClick={removeParam}
          style={{ display: 'block', marginBlock: '2rem' }}
        >
          Remove query param
        </button>
      </div>
      <a href="/country/afg">navigate to detail page</a> */}
    </>
  );
}
