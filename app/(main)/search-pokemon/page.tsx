"use client";

import RegxInputSearch from "@/app/component/RegxInputSearch";
import { Card, Image, Button, Modal, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetDetailPokemon } from "./api/search.api";
import AttackTableComponent from "@/app/component/AttackTable";
import "./style.css";

export default function SearchPokemon() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pokemons, setPokemons] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalFastOpen, setIsModalFastOpen] = useState(false);
  const [isModalSpecialOpen, setIsModalSpecialOpen] = useState(false);
  const showFastModal = () => {
    setIsModalFastOpen(true);
  };
  const handleFastClose = () => {
    setIsModalFastOpen(false);
  };
  const showSpecialModal = () => {
    setIsModalSpecialOpen(true);
  };
  const handleSpecialClose = () => {
    setIsModalSpecialOpen(false);
  };
  const onSearch: (value: string) => void = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setLoading(true);
    const fetchPokemon = async () => {
      const name = searchParams.get("name");
      if (name) {
        const data = await GetDetailPokemon(name);
        setPokemons(data);
      } else {
        setPokemons(null);
      }
      setLoading(false);
    };
    fetchPokemon();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <RegxInputSearch
        placeholder="Pokemon Search"
        size="large"
        onSearch={onSearch}
      />
      <div className="mt-5 w-full max-w-3xl">
        {loading ? (
          <div className="text-center">
            <Spin />
          </div>
        ) : pokemons ? (
          <Card
            className="text-[18px] font-bold"
            key={pokemons.id}
            title={pokemons.name}
            style={{ width: "100%" }}
          >
            <div className="flex justify-center">
              <Image
                width={200}
                src={pokemons.image}
                alt={pokemons.name}
                className="max-w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4  mt-5">
              <div className="flex flex-col col-span-3 md:items-center">
                <p>
                  Name : <span className="info-text">{pokemons.name}</span>
                </p>
                <p>
                  Weight :{" "}
                  <span className="info-text">
                    {pokemons.weight.minimum} - {pokemons.weight.maximum}
                  </span>
                </p>
                <p>
                  Height :{" "}
                  <span className="info-text">
                    {pokemons.height.minimum} - {pokemons.height.maximum}
                  </span>
                </p>
                <p>
                  Classification :{" "}
                  <span className="info-text">{pokemons.classification}</span>
                </p>
                <p>
                  Types : <span className="info-text">{pokemons.types}</span>
                </p>
                <p>
                  Resistant :{" "}
                  <span className="info-text">{pokemons.resistant}</span>
                </p>
                <p>
                  Weaknesses :{" "}
                  <span className="info-text">{pokemons.weaknesses}</span>
                </p>
                <p>
                  FleeRate :{" "}
                  <span className="info-text">{pokemons.fleeRate}</span>
                </p>
                <p>
                  MaxCP : <span className="info-text">{pokemons.maxCP}</span>
                </p>
                <p>
                  MaxHP : <span className="info-text">{pokemons.maxHP}</span>
                </p>
              </div>

              <div className="flex flex-col col-span-2">
                <div className="flex flex-col items-center justify-center gap-y-5">
                  <p className="font-semibold">Attacks</p>
                  <Button type="primary" onClick={showFastModal}>
                    Fast Attacks
                  </Button>
                  {/* Fast Attacks Modal */}
                  <Modal
                    title="Fast Attacks"
                    open={isModalFastOpen}
                    onOk={handleFastClose}
                    onCancel={handleFastClose}
                  >
                    <AttackTableComponent rawdata={pokemons.attacks.fast} />
                  </Modal>
                  <Button type="primary" onClick={showSpecialModal}>
                    Special Attacks
                  </Button>
                  {/* Special Attacks Modal */}
                  <Modal
                    title="Special Attacks"
                    open={isModalSpecialOpen}
                    onOk={handleSpecialClose}
                    onCancel={handleSpecialClose}
                  >
                    <AttackTableComponent rawdata={pokemons.attacks.special} />
                  </Modal>
                </div>
                {pokemons.evolutions && (
                  <div className="flex flex-col items-center gap-y-3 mt-5">
                    <p className="font-semibold">Evolution</p>
                    {pokemons.evolutions.map((item: any) => {
                      return (
                        <Button
                          onClick={() => onSearch(item.name)}
                          className="text-[20px]"
                          type="link"
                        >
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ) : (
          <div className="text-center text-gray-600">No Pokémon found</div>
        )}
      </div>
    </div>
  );
}
