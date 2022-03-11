import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const queryResult = query.get("q");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [showModal, setShowModal] = useState(false);

  const clickReview = item => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const mock = [
    {
      id: 1,
      likes: 6,
      numberComments: 3,
      name: "A Sombra do Vento",
      author: "Carlos Ruiz Zafón",
      photo: "https://images-na.ssl-images-amazon.com/images/I/91xOzA3VHtL.jpg",
      date: "03/01/2022",
      stars: 100,
      user: {
        username: "@almirgon",
      },
      resume:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi atque animi iusto tenetur repellat minima, ut illo provident assumenda soluta non earum voluptates sint quibusdam. Adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi",
      review:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum.",
      comments: [
        {
          id: 1,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@thalytabnd",
          date: "20/12/2021",
        },
        {
          id: 2,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@gustavo",
          date: "31/12/2021",
        },
        {
          id: 3,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@wanderson",
          date: "02/01/2022",
        },
      ],
    },
    {
      id: 2,
      likes: 9,
      numberComments: 2,
      name: "iT A Coisa",
      author: "Stephen King",
      photo: "https://images-na.ssl-images-amazon.com/images/I/71dIjJTeOSL.jpg",
      date: "27/07/2021",
      stars: 60,
      user: {
        username: "@dudu",
      },
      resume:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi atque animi iusto tenetur repellat minima, ut illo provident assumenda soluta non earum voluptates sint quibusdam. Adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi",
      review:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum.",
      comments: [
        {
          id: 4,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@thalytabnd",
          date: "20/12/2021",
        },
        {
          id: 5,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@gustavo",
          date: "31/12/2021",
        },
      ],
    },
    {
      id: 3,
      likes: 7,
      numberComments: 4,
      name: "Harry Potter e a Ordem da Fênix",
      author: "J.K. Rowling",
      photo:
        "https://m.media-amazon.com/images/P/B01LQM96IC.01._SCLZZZZZZZ_SX500_.jpg",
      date: "27/07/2021",
      stars: 80,
      user: {
        username: "@antunes",
      },
      resume:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi atque animi iusto tenetur repellat minima, ut illo provident assumenda soluta non earum voluptates sint quibusdam. Adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi",
      review:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum.",
      comments: [
        {
          id: 6,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@pedro",
          date: "01/12/2021",
        },
        {
          id: 7,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@antonio",
          date: "08/12/2021",
        },
        {
          id: 8,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@lucas",
          date: "06/01/2022",
        },
        {
          id: 9,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@italo",
          date: "21/01/2022",
        },
      ],
    },
    {
      id: 4,
      likes: 5,
      numberComments: 2,
      name: "1984",
      author: "George Orwell",
      photo: "https://images-na.ssl-images-amazon.com/images/I/819js3EQwbL.jpg",
      date: "27/07/2021",
      stars: 20,
      user: {
        username: "@carolmbd_",
      },
      resume:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi atque animi iusto tenetur repellat minima, ut illo provident assumenda soluta non earum voluptates sint quibusdam. Adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi",
      review:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum.",
      comments: [
        {
          id: 10,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@pietro",
          date: "03/12/2021",
        },
        {
          id: 11,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@sunshinne",
          date: "20/01/2022",
        },
      ],
    },
    {
      id: 5,
      likes: 1,
      numberComments: 2,
      name: "Duna",
      author: "Frank Herbert",
      photo:
        "https://i.pinimg.com/564x/3f/37/fb/3f37fbc161a83e952dfc8f5103f36939.jpg",
      date: "27/07/2021",
      stars: 100,
      user: {
        username: "@thalytabdn",
      },
      resume:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi atque animi iusto tenetur repellat minima, ut illo provident assumenda soluta non earum voluptates sint quibusdam. Adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi",
      review:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum.",
      comments: [
        {
          id: 12,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@darcy",
          date: "14/12/2021",
        },
        {
          id: 13,
          comment:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, rerum aliquid consequatur accusamus officiis mollitia",
          username: "@brunna",
          date: "13/01/2022",
        },
      ],
    },
  ];

  useEffect(() => {
    console.log(results.length);

    if (queryResult !== "") {
      const filteredData = mock.filter(item => {
        return (
          item.author.toLowerCase().includes(queryResult.toLowerCase()) ||
          item.name.toLowerCase().includes(queryResult.toLowerCase())
        );
      });
      setResults(filteredData);
    } else {
      setResults(mock);
    }
  }, [queryResult]);

  return (
    <section>
      <h2>Resultados da pesquisa</h2>
      {results.length > 0 ? (
        results.map((item, index) => {
          return (
            <div className={"cards animeLeft"}>
              <Card
                click={() => clickReview(item)}
                key={index}
                index={index}
                item={item}
              />
            </div>
          );
        })
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            textAlign: "center",
          }}
        >
          <p>Nenhum resultado encontrado</p>
        </div>
      )}
      {showModal && <Modal item={selectedItem} close={setShowModal} />}
    </section>
  );
};

export default SearchPage;
